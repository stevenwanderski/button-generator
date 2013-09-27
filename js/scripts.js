Button = {};
Button.styles = [];

$(function(){

  $('input,textarea').attr('autocomplete', 'off');

  Button.attach_handlers();
  Button.initialize_controls();
  Button.update_styles();

});

/**
 * Initialize any DOM functionality (clicks, changes, etc..)
 */
Button.attach_handlers = function(){

  // accordion
  $('#settings-wrap .panel-wrap').click(function() {
    if(!$(this).hasClass('active')){
      $('.panel-wrap').removeClass('active');
      $('.accordion-inner').slideUp(200);
      $(this).addClass('active').next('.accordion-inner').slideDown(200);
    }
  });

  // more link
  $('.more-link').click(function(e){
    e.preventDefault();
    $(this).html() == 'More' ? $(this).html('Hide') : $(this).html('More');
    var section = $(this).attr('data-section');
    $('[data-section-more="' + section + '"]').slideToggle(200);
  });

  // settings input click
  $('#settings-wrap [data-control]').change(function(){
    Button.control_update($(this));
  });

  // settings display click
  $('#settings-wrap [data-control-display]').change(function(){
    Button.control_display_change($(this));
  });

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
        Button.update_styles();
      }
    });
  });

  $('input, select').on('change keyup', function(){
    Button.update_styles();
  });

}

/**
 * Initialize (enable / disable) controls on load
 */
Button.initialize_controls = function(){
  $('#settings-wrap [data-control]').each(function(){
    Button.control_update($(this));
  });
  $('#settings-wrap [data-control-display]:checked').each(function(){
    Button.control_display_change($(this));
  });

}

/**
 * Change a control value (enable / disable controls)
 */
Button.control_update = function(el){
  var checked = el.is(':checked');
  var control = el.attr('data-control');

  // standard one-to-one controls
  $('[data-control-group="' + control + '"]').each(function(){
    checked ? Button.enable_control($(this)) : Button.disable_control($(this));
  });

  // group-switch controls
  $('[data-control-group-switch="' + control + '"]').each(function(){
    if(checked){
      Button.disable_control($(this));
    }else{
      $(this).find(':checkbox').each(function(){
        this.disabled = false;
      });
      $(this).removeClass('disabled').find('[data-control]').each(function(){
        Button.control_update($(this));
      });
    }
  });
}

/**
 * Change a control display (hide / show)
 */
Button.control_display_change = function(el){
  var control = el.attr('data-control-display');
  var display_selector = el.attr('name');
  $('[data-control-display-selector="' + display_selector + '"]').hide();
  $('[data-control-display-group="' + control + '"]').show();
}

/**
 * Disable all inputs and sliders in the element (el)
 */
Button.disable_control = function(el){
  el.addClass('disabled');
  el.find('.ui-slider').slider('disable');
  el.find('input, select').each(function(){
    this.disabled = true;
  });
}

/**
 * Enable all inputs and sliders in the element (el)
 */
Button.enable_control = function(el){
  el.removeClass('disabled');
  el.find('.ui-slider').slider('enable');
  el.find('input, select').each(function(){
    this.disabled = false;
  });
}

/**
 * Update the array that stores all css values
 */
Button.update_styles = function(){
  Button.styles = {};
  $('input[type="text"], select').not(':disabled').each(function(){
    var css_property = $(this).attr('id');
    Button.styles[css_property] = $(this).val();
  });
  console.log(Button.styles);
  Button.render_styles();
}

/**
 * Update the output of the css styles
 */
Button.render_styles = function(){
  var output = '';
  $.each(Button.styles, function(css_property, css_value){
    output += css_property + ': ' + css_value + ';<br />';
  });
  output = '<pre>.button {<br/>' + output + '}</pre>';
  $('#css-display').html(output);
}