$(function(){	
	
	// hold all disabled styles
	var disabledStylesArray = [];
	// holds the input that is affected by the colorpicker
	var inputFocus = '';
	// holds all style sets
	var styleSetsObj = {
		'padding':{'open':false, 'master':10, 'top':10, 'right':10, 'bottom':10, 'left':10},
		'border':{open:false}
	};
	// holds the display toggle of IE styles
	var showIE = false;
	
	updateOnPageLoad();
	
	/**
	 * Plugins
	 * 
	 * color picker, slider
	 */
	
	// last input to recieve focus - used by the color pickers
	$('input').focus(function(){
		inputFocus = $(this);		
	});
	
	// initialize the color picker
	$('.color').ColorPicker({
		onSubmit: function(hsb, hex, rgb, el){
			// hide the color picker
			$(el).ColorPickerHide();
		},
		onBeforeShow: function (){
			$(this).ColorPickerSetColor(this.value);
		},
		onChange: function(hsb, hex, rgb, el){
			// populate the input with the hex value
			inputFocus.val('#'+hex);
			// update the color preview
			inputFocus.next('.color-view').css('backgroundColor', '#'+hex);
			updateStyles();
		}
	});
	
	// open the color picker when the color preview is clicked
	$('.color-view').bind('click', colorDisplayShow);	
	
	// apply a slider to any input with class "slider-bound"
	$('input.slider-bound').each(function(index) {
		// get input ID
	  var inputId = $(this).attr('id');
		// get input value
		var inputValue = $(this).val();
		// get input max
		var inputMax = $(this).attr('max');
		$('#'+inputId+'-slider').slider({
			value: inputValue,
			max: inputMax,
			min: 0,
			slide: function(event, ui){
				$(this).prev().val(ui.value);
				updateStyles();
			}
		});
	});
	
	/**
	 * Input keyup, blur, change
	 */
	
	// update the styles every time an input changes from keystroke
	$('input[type="text"]').not('#text').keyup(function(){
		var id = $(this).attr('id');
		var value = $(this).val();
		updateStyles();
		if($(this).hasClass('slider-bound')){
			$('#'+id+'-slider').slider('value', value);
		}
	});
	
	// update the button text on keyup
	$('#text').keyup(function(){
		var textValue = $(this).val();
		$('.button').html(textValue);
	});
	
	// disable input if value is NULL
	$('input[type="text"]').blur(function(){
		if($(this).val() == ''){
			if(!$(this).is('.color')){
				$(this).val(0);
			}
			var id = $(this).attr('id');
			disableInput(id);
		};
	})
	
	// when a select box is changed, update the styles
	$('select').change(function() {
		updateStyles();
	});
	
	/**
	 * Checkbox click
	 */
	$('input[type="checkbox"]:not("#ie-styles")').change(function() {
		var inputId = $(this).attr('id');
		inputId = inputId.replace(/-check/, '');
		if($(this).is(':checked')){
			enableInput(inputId);
		}else{
			disableInput(inputId);
		}
	});
	
	// ie styles click
	$('#ie-styles').change(function() {
		if($(this).is(':checked')){
			showIE = true;
		}else{
			showIE = false;
		}
		updateStyles();
		zebraStripeStyles();
	});
	
	/**
	 * Radio button click
	 */
	$('input[type="radio"]').click(function() {
		checkBackgroundState();
		checkBackgroundStateHover();
	});	
	
	/**
	 * Accordion functionality
	 */
	$('#settings-wrap .panel-wrap').click(function() {
		if(!$(this).hasClass('active')){
			$('.panel-wrap').removeClass('active');
			$('.accordion-inner').slideUp(200);
			$(this).addClass('active').next('.accordion-inner').slideDown(200);
		}
	});
	
	// click a "more" link
	$('.more-link').click(function() {
		var $this = $(this);
		// get the style input
		var inputId = $this.attr('section');
		// get the "more" state
		var open = styleSetsObj[inputId]['open'];
		if(!open){
			// open the .more section, then fade in the checkboxes
			$this.next('.more').slideToggle(200, function(){
				$(this).find('input[type="checkbox"]').fadeIn(100);
			});
			// set the state to open
			styleSetsObj[inputId]['open'] = true;
			// disableInput(inputId);
			$this.html('hide');
		}else{
			// fade out the checkboxes
			$('input[type="checkbox"]', $this.next('.more')).fadeOut(100);
			// close the .more div
			$(this).next('.more').slideToggle(200);
			// set the state to closed
			styleSetsObj[inputId]['open'] = false;
			// enableInput(inputId);
			$this.html('more');
		}		
		return false;
	});
	
	/**
	 * Disable an input
	 */
	function disableInput(inputId){
		// if text-shadow-color disable corresponding styles
		if(inputId == 'text-shadow-color'){
			disableInput('text-shadow-x');
			disableInput('text-shadow-y');
			disableInput('text-shadow-blur');
		}
		// if box-shadow-color disable corresponding styles
		else if(inputId == 'box-shadow-color'){
			disableInput('box-shadow-x');
			disableInput('box-shadow-y');
			disableInput('box-shadow-blur');
		}
		// if border-color disable corresponding styles
		else if(inputId == 'border-color'){
			disableInput('border-style');
			disableInput('border-width');
		}
		// if background, disable the radio buttons
		else if(inputId == 'background'){
			if($('#background-gradient').is(':checked')){
				disableInput('bg-start-gradient');
				disableInput('bg-end-gradient');
			}else{
				disableInput('bg-color');
			}
			$('#background-gradient, #background-solid').attr('disabled', true);
		}
		// if background-hover, disable the radio buttons
		else if(inputId == 'background-hover'){
			if($('#background-gradient-hover').is(':checked')){
				disableInput('bg-start-gradient-hover');
				disableInput('bg-end-gradient-hover');
			}else{
				disableInput('bg-color-hover');
			}
			$('#background-gradient-hover, #background-solid-hover').attr('disabled', true);
		}
		
		// disable input
		$('#'+inputId).attr('disabled', true);
		// disable slider
		$('#'+inputId+'-slider').slider('disable');
		// uncheck checkbox
		$('#'+inputId+'-check').removeAttr('checked');
		// dim the label
		$('label[for="'+inputId+'"]').css('color', '#ccc');
		// if "color" input remove click event
		if($('#'+inputId).hasClass('color')){
			$('#'+inputId).next('.color-view').unbind('click');
		}
		// add the style to the "disabled styles" array
		disabledStylesArray.push(inputId)
		updateStyles();
	}
	
	/**
	 * Enable an input
	 */
	function enableInput(inputId){
		// if text-shadow-color enable corresponding styles
		if(inputId == 'text-shadow-color'){
			enableInput('text-shadow-x');
			enableInput('text-shadow-y');
			enableInput('text-shadow-blur');
		}
		// if box-shadow-color enable corresponding styles
		else if(inputId == 'box-shadow-color'){
			enableInput('box-shadow-x');
			enableInput('box-shadow-y');
			enableInput('box-shadow-blur');
		// if padding enable corresponding styles
		}else if(inputId == 'padding'){
			disableInput('padding-top');
			disableInput('padding-right');
			disableInput('padding-bottom');
			disableInput('padding-left');
		// disable padding
		}else if(inputId == 'padding-top' || inputId == 'padding-right' || inputId == 'padding-bottom' || inputId == 'padding-left'){
			disableInput('padding');
		// enable border-color, border-width, border-style - disable the single borders
		}else if(inputId == 'border-color'){
			enableInput('border-style');
			enableInput('border-width');
			disableInput('border-top-color');
			disableInput('border-top-style');
			disableInput('border-top-width');
			disableInput('border-right-color');
			disableInput('border-right-style');
			disableInput('border-right-width');
			disableInput('border-bottom-color');
			disableInput('border-bottom-style');
			disableInput('border-bottom-width');
			disableInput('border-left-color');
			disableInput('border-left-style');
			disableInput('border-left-width');			
		// enable the single borders
		}else if(inputId == 'border-top-color'){
			enableInput('border-top-style');
			enableInput('border-top-width');
			disableInput('border-color');
			disableInput('border-style');
			disableInput('border-width');
		}else if(inputId == 'border-right-color'){
			enableInput('border-right-style');
			enableInput('border-right-width');
			disableInput('border-color');
			disableInput('border-style');
			disableInput('border-width');
		}else if(inputId == 'border-bottom-color'){
			enableInput('border-bottom-style');
			enableInput('border-bottom-width');
			disableInput('border-color');
			disableInput('border-style');
			disableInput('border-width');
		}else if(inputId == 'border-left-color'){
			enableInput('border-left-style');
			enableInput('border-left-width');
			disableInput('border-color');
			disableInput('border-style');
			disableInput('border-width');
		}else if(inputId == 'background'){
			if($('#background-gradient').is(':checked')){
				enableInput('bg-start-gradient');
				enableInput('bg-end-gradient');
			}else{
				enableInput('bg-color');
			}			
			$('#background-gradient, #background-solid').attr('disabled', false);
		}else if(inputId == 'background-hover'){
			if($('#background-gradient-hover').is(':checked')){
				enableInput('bg-start-gradient-hover');
				enableInput('bg-end-gradient-hover');
			}else{
				enableInput('bg-color-hover');
			}			
			$('#background-gradient-hover, #background-solid-hover').attr('disabled', false);
		}
		// enable input	
		$('#'+inputId).removeAttr('disabled');
		// enable slider
		$('#'+inputId+'-slider').slider('enable');
		// refresh to original color
		$('label[for="'+inputId+'"]').css('color', '#666');
		// if "color" input re-bind the click event
		if($('#'+inputId).hasClass('color')){
			// check if the value is NULL
			if($('#'+inputId).val() == ''){
				// set both input and color picker to default gray - #666666
				$('#'+inputId).val('#666666');
				$('#'+inputId).ColorPickerSetColor('#666666');
			}
			$('#'+inputId).next('.color-view').bind('click', colorDisplayShow);
		}
		// remove the style from the disabled array
		disabledStylesArray = $.grep(disabledStylesArray, function(value){
			return value != inputId;
		});
		updateStyles();
	}
		
	/**
	 * Build the CSS style string
	 */
	function getStyleString(){
		// create empty string for styles
		var cssString = '';
		
		// create an empty array to hold all styles
		var stylesArray = [];
		
		// get each input value
		$('input[type="text"]').each(function(index) {
		  var id = $(this).attr('id');
			// if style is not disabled, add it to the string
			if($.inArray(id, disabledStylesArray) == -1){
				stylesArray[id] = $(this).val();
			}
		});
		
		$('select').each(function(index) {
		  var id = $(this).attr('id');
			if($.inArray(id, disabledStylesArray) == -1){
				stylesArray[id] = $(this).val();
			}
		});
				
		// build the CSS string
		cssString = '<div class="code-row">.button {</div>';
		// check if font-family is set
		if(stylesArray['font-family']){
			cssString += '<div class="code-row">  font-family: ' + stylesArray['font-family'] + ';</div>';
		}
		// check if font-color is set
		if(stylesArray['font-color']){
			cssString += '<div class="code-row">  color: ' + stylesArray['font-color'] + ';</div>';
		}
		// check if font-size is set
		if(stylesArray['font-size']){
			cssString += '<div class="code-row">  font-size: ' + stylesArray['font-size'] + 'px;</div>';
		}
		// check if full padding is set
		if(stylesArray['padding']){
			cssString += '<div class="code-row">  padding: ' + stylesArray['padding'] + 'px;</div>';
		}else{
			// check if padding-top is set
			if(stylesArray['padding-top']){
				cssString += '<div class="code-row">  padding-top: ' + stylesArray['padding-top'] + 'px;</div>';
			}
			// check if padding-right is set
			if(stylesArray['padding-right']){
				cssString += '<div class="code-row">  padding-right: ' + stylesArray['padding-right'] + 'px;</div>';
			}
			// check if padding-top is set
			if(stylesArray['padding-bottom']){
				cssString += '<div class="code-row">  padding-bottom: ' + stylesArray['padding-bottom'] + 'px;</div>';
			}
			// check if padding-top is set
			if(stylesArray['padding-left']){
				cssString += '<div class="code-row">  padding-left: ' + stylesArray['padding-left'] + 'px;</div>';
			}			
		}	
		// check if border-radius is set
		cssString += '<div class="code-row">  text-decoration: none;</div>';
		if(stylesArray['border-radius']){
			cssString += '<div class="code-row">  -webkit-border-radius: ' + stylesArray['border-radius'] + 'px;</div>';
			cssString += '<div class="code-row">  -moz-border-radius: ' + stylesArray['border-radius'] + 'px;</div>';
			cssString += '<div class="code-row">  border-radius: ' + stylesArray['border-radius'] + 'px;</div>';
		}
		// check if box-shadow is set
		if(stylesArray['box-shadow-color']){
			cssString += '<div class="code-row">  -webkit-box-shadow: ' + stylesArray['box-shadow-x'] + 'px ' + stylesArray['box-shadow-y'] + 'px ' + stylesArray['box-shadow-blur'] + 'px ' + stylesArray['box-shadow-color'] + ';</div>';
			cssString += '<div class="code-row">  -moz-box-shadow: ' + stylesArray['box-shadow-x'] + 'px ' + stylesArray['box-shadow-y'] + 'px ' + stylesArray['box-shadow-blur'] + 'px ' + stylesArray['box-shadow-color'] + ';</div>';
			cssString += '<div class="code-row">  box-shadow: ' + stylesArray['box-shadow-x'] + 'px ' + stylesArray['box-shadow-y'] + 'px ' + stylesArray['box-shadow-blur'] + 'px ' + stylesArray['box-shadow-color'] + ';</div>';
		}
		// check if text-shadow is set
		if(stylesArray['text-shadow-color']){
			cssString += '<div class="code-row">  text-shadow: ' + stylesArray['text-shadow-x'] + 'px ' + stylesArray['text-shadow-y'] + 'px ' + stylesArray['text-shadow-blur'] + 'px ' + stylesArray['text-shadow-color'] + ';</div>';
		}
		// check if border-color is set
		if(stylesArray['border-color']){
			cssString += '<div class="code-row">  border: ' + stylesArray['border-style'] + ' ' + stylesArray['border-color'] + ' ' + stylesArray['border-width'] + 'px;</div>';
		}else{
			// check if border-top is set
			if(stylesArray['border-top-color']){
				cssString += '<div class="code-row">  border-top: ' + stylesArray['border-top-style'] + ' ' + stylesArray['border-top-color'] + ' ' + stylesArray['border-top-width'] + 'px;</div>';
			}
			// check if border-right is set
			if(stylesArray['border-right-color']){
				cssString += '<div class="code-row">  border-right: ' + stylesArray['border-right-style'] + ' ' + stylesArray['border-right-color'] + ' ' + stylesArray['border-right-width'] + 'px;</div>';
			}
			// check if border-bottom is set
			if(stylesArray['border-bottom-color']){
				cssString += '<div class="code-row">  border-bottom: ' + stylesArray['border-bottom-style'] + ' ' + stylesArray['border-bottom-color'] + ' ' + stylesArray['border-bottom-width'] + 'px;</div>';
			}
			// check if border-left is set
			if(stylesArray['border-left-color']){
				cssString += '<div class="code-row">  border-left: ' + stylesArray['border-left-style'] + ' ' + stylesArray['border-left-color'] + ' ' + stylesArray['border-left-width'] + 'px;</div>';
			}			
		}
		// check if bg-start-gradient and bg-end-gradient are set
		if(stylesArray['bg-start-gradient'] && stylesArray['bg-end-gradient']){
			cssString += '<div class="code-row">  background: -webkit-gradient(linear, 0 0, 0 100%, from(' + stylesArray['bg-start-gradient'] + '), to(' + stylesArray['bg-end-gradient'] + '));</div>';
			cssString += '<div class="code-row">  background: -moz-linear-gradient(top, ' + stylesArray['bg-start-gradient'] + ', ' + stylesArray['bg-end-gradient'] + ');</div>'; 
		}else if(stylesArray['bg-color']){
			cssString += '<div class="code-row">  background: ' + stylesArray['bg-color'] + ';</div>';
		}
		if(showIE){
			if(stylesArray['bg-start-gradient'] && stylesArray['bg-end-gradient']){
				cssString += '<div class="code-row">  -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorStr=' + stylesArray['bg-start-gradient'] + ', endColorStr=' + stylesArray['bg-end-gradient'] + ');</div>';
				cssString += '<div class="code-row">  filter: progid:DXImageTransform.Microsoft.gradient(startColorStr=' + stylesArray['bg-start-gradient'] + ', endColorStr=' + stylesArray['bg-end-gradient'] + ');</div>';
				cssString += '<div class="code-row">  display:inline-block; /* IE is so silly */</div>';
			}
		}
		cssString += '<div class="code-row">}</div><div class="code-row"></div>';
		
		// check for hover styles
		if(stylesArray['bg-color-hover'] || stylesArray['bg-start-gradient-hover'] || stylesArray['bg-end-gradient-hover']){
			cssString += '<div class="code-row">.button:hover {</div>';
			// check if solid bg hover is set
			if(stylesArray['bg-color-hover']){
				cssString += '<div class="code-row">  background: ' + stylesArray['bg-color-hover'] + ';</div>';
			}else if(stylesArray['bg-start-gradient-hover'] && stylesArray['bg-end-gradient-hover']){
				cssString += '<div class="code-row">  background: -webkit-gradient(linear, 0 0, 0 100%, from(' + stylesArray['bg-start-gradient-hover'] + '), to(' + stylesArray['bg-end-gradient-hover'] + '));</div>';
				cssString += '<div class="code-row">  background: -moz-linear-gradient(top, ' + stylesArray['bg-start-gradient-hover'] + ', ' + stylesArray['bg-end-gradient-hover'] + ')</div>'; 				
			}
			if(showIE){
				if(stylesArray['bg-start-gradient-hover'] && stylesArray['bg-end-gradient-hover']){
					cssString += '<div class="code-row">  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=' + stylesArray['bg-start-gradient'] + ', endColorstr=' + stylesArray['bg-end-gradient'] + ');</div>\n';
				}
			}
			
			cssString += '<div class="code-row">}</div>';
		}		
		return cssString;
	}
	
	/**
	 * Update (replace) the CSS styles
	 */
	function updateStyles(){
		// set the new style string
		styles = getStyleString();
		var styleString = '<style id="dynamic-styles" type="text/css">'+$(styles).text()+'</style>';
		// replace the head styles
		$('#dynamic-styles').replaceWith(styleString);
		// update the styles code view
		$('#css-display').html('<pre>'+styles+'</pre>');
		zebraStripeStyles();
	}
			
	/**
	 * Update values on initial page load
	 */
	function updateOnPageLoad(){
		// append an empty <style> to manipulate later
		$('head').append('<style id="dynamic-styles" type="text/css"></style>');
		
		// kill the default link action
		$('.button').click(function() {
			return false;
		});

		// do an initial update of styles
		var styles = getStyleString();
		updateStyles(styles);
		
		// update the color previews
		$('.color').each(function(index) {
		  var colorValue = $(this).val();
			$(this).next('.color-view').css('backgroundColor', colorValue);
		});
		
		// if input value is NULL on page load, disable the input
		$('input[type="text"], select#font-family').each(function(index) {
			$(this).removeAttr('disabled');
		  if($(this).val() == ''){
				var id = $(this).attr('id');
				disableInput(id);
			}
		});
		
		// uncheck ie styles on page load
		$('#ie-styles').removeAttr('checked');
		
		// make radio buttons enabled on page load
		$('input[type="radio"]').each(function(index) {
		  $(this).removeAttr('disabled');
		});
		
		// disable all the single border styles
		disableInput('border-top-color');
		disableInput('border-top-style');
		disableInput('border-top-width');
		disableInput('border-right-color');
		disableInput('border-right-style');
		disableInput('border-right-width');
		disableInput('border-bottom-color');
		disableInput('border-bottom-style');
		disableInput('border-bottom-width');
		disableInput('border-left-color');
		disableInput('border-left-style');
		disableInput('border-left-width');
		
		$('#background-gradient').attr('checked', true);
		$('#background-solid-hover').attr('checked', true);
		
		// check the background state
		checkBackgroundState();
		checkBackgroundStateHover()
		
		// set the button text
		$('.button').html($('#text').val());
		
		// zebra stripe code view
		zebraStripeStyles()
		
	}
	
	/**
	 * Click function for .color-view
	 */
	function colorDisplayShow(){
		inputFocus = $(this).prev();
		$(this).prev().ColorPickerShow();
	}
	
	/**
	 * Display gradient or solid background options for "up" state
	 */
	function checkBackgroundState(){
		if($('#background-gradient').is(':checked')){
			$('#gradient-wrap').show();
			$('#solid-wrap').hide();
			enableInput('bg-start-gradient');
			enableInput('bg-end-gradient');
			disableInput('bg-color');
		}else{
			$('#solid-wrap').show();
			$('#gradient-wrap').hide();
			enableInput('bg-color');
			disableInput('bg-start-gradient');
			disableInput('bg-end-gradient');
		}
	}
	
	/**
	 * Display gradient or solid background options for "hover" state
	 */
	function checkBackgroundStateHover(){
		if($('#background-gradient-hover').is(':checked')){
			$('#gradient-hover-wrap').show();
			$('#solid-hover-wrap').hide();
			enableInput('bg-start-gradient-hover');
			enableInput('bg-end-gradient-hover');
			disableInput('bg-color-hover');
		}else{
			$('#solid-hover-wrap').show();
			$('#gradient-hover-wrap').hide();
			enableInput('bg-color-hover');
			disableInput('bg-start-gradient-hover');
			disableInput('bg-end-gradient-hover');
		}
	}
	
	/**
	 * Zebra-stripe the styles code
	 */
	function zebraStripeStyles(){
		$('.code-row:even').addClass('odd');
	}
	
	
	
	
	
	
	
});