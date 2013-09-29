Button = {};
Button.styles = [];
Button.styles_markup = '';
Button.styles_hover_markup = '';
Button.pixel_properties = ['font-size', 'border-radius', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'];
Button.gradient_properties = ['bg-start-gradient', 'bg-end-gradient'];

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
  $('[data-control-display-selector="' + display_selector + '"]').addClass('hidden').hide();
  $('[data-control-display-group="' + control + '"]').removeClass('hidden').show();
  Button.enable_control($('[data-control-display-group="' + control + '"]'));
  Button.disable_control($('[data-control-display-selector="' + display_selector + '"].hidden'));
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
  Button.prepare_styles();
  Button.generate_style_markup();
  Button.render_styles();
}

/**
 * Prepares the raw style data for css presentation (removes, combines, etc..)
 */
Button.prepare_styles = function(){
  Button.styles = {};
  Button.styles_markup = '';
  Button.styles_hover_markup = '';

  $('input[type="text"], select').not(':disabled').each(function(){
    var css_property = $(this).attr('id');
    Button.styles[css_property] = $(this).val();
  });

  // remove the text data
  delete Button.styles['text'];

  // combine padding if all are present
  var padding_top, padding_right, padding_bottom, padding_left;
  if((padding_top = Button.styles['padding-top']) &&
     (padding_right = Button.styles['padding-right']) &&
     (padding_bottom = Button.styles['padding-bottom']) &&
     (padding_left = Button.styles['padding-left'])){
    Button.styles['padding'] = padding_top + 'px ' + padding_right + 'px ' + padding_bottom + 'px ' + padding_left + 'px';
    delete Button.styles['padding-top'];
    delete Button.styles['padding-right'];
    delete Button.styles['padding-bottom'];
    delete Button.styles['padding-left'];
  }

  // combine border styles
  var border_style, border_color, border_width;
  if((border_style = Button.styles['border-style']) &&
     (border_color = Button.styles['border-color']) &&
     (border_width = Button.styles['border-width'])){
    Button.styles['border'] = border_style + ' ' + border_color + ' ' + border_width + 'px';
    delete Button.styles['border-style'];
    delete Button.styles['border-color'];
    delete Button.styles['border-width'];
  }

  console.log(Button.styles);
}

/**
 * Populates the Button.styles_markup property with the renderable string
 */
Button.generate_style_markup = function(){

  // if gradients exist
  var gradient_start, gradient_end;
  if((gradient_start = Button.styles['bg-start-gradient']) &&
     (gradient_end = Button.styles['bg-end-gradient'])){
    Button.styles_markup += 'background-image: -webkit-linear-gradient(top, ' + gradient_start + ', ' + gradient_end + ');\n';
    Button.styles_markup += 'background-image: -moz-linear-gradient(top, ' + gradient_start + ', ' + gradient_end + ');\n';
    Button.styles_markup += 'background-image: -ms-linear-gradient(top, ' + gradient_start + ', ' + gradient_end + ');\n';
    Button.styles_markup += 'background-image: -o-linear-gradient(top, ' + gradient_start + ', ' + gradient_end + ');\n';
    Button.styles_markup += 'background-image: linear-gradient(to bottom, ' + gradient_start + ', ' + gradient_end + ');\n';
    delete Button.styles['bg-start-gradient'];
    delete Button.styles['bg-end-gradient'];
    delete Button.styles['bg-color'];
  }

  // if gradient hovers exist
  var gradient_hover_start, gradient_hover_end;
  if((gradient_hover_start = Button.styles['bg-start-gradient-hover']) &&
     (gradient_hover_end = Button.styles['bg-end-gradient-hover'])){
    Button.styles_hover_markup += 'background-image: -webkit-linear-gradient(top, ' + gradient_hover_start + ', ' + gradient_hover_end + ');\n';
    Button.styles_hover_markup += 'background-image: -moz-linear-gradient(top, ' + gradient_hover_start + ', ' + gradient_hover_end + ');\n';
    Button.styles_hover_markup += 'background-image: -ms-linear-gradient(top, ' + gradient_hover_start + ', ' + gradient_hover_end + ');\n';
    Button.styles_hover_markup += 'background-image: -o-linear-gradient(top, ' + gradient_hover_start + ', ' + gradient_hover_end + ');\n';
    Button.styles_hover_markup += 'background-image: linear-gradient(to bottom, ' + gradient_hover_start + ', ' + gradient_hover_end + ');\n';
    delete Button.styles['bg-start-gradient-hover'];
    delete Button.styles['bg-end-gradient-hover'];
    delete Button.styles['background-hover'];
  }

  var border_radius;
  if((border_radius = Button.styles['border-radius'])){
    Button.styles_markup += '-webkit-border-radius: ' + border_radius + 'px;\n';
    Button.styles_markup += '-moz-border-radius: ' + border_radius + 'px;\n';
    Button.styles_markup += 'border-radius: ' + border_radius + 'px;\n';
    delete Button.styles['border-radius'];
  }

  $.each(Button.styles, function(css_property, css_value){
    // check if "px" should appended to the style
    var px_value = $.inArray(css_property, Button.pixel_properties) > -1 ? 'px' : '';

    Button.styles_markup += css_property + ': ' + css_value + px_value + ';\n';

    // handle the hover background
    if(css_property == 'background-hover'){
      Button.styles_hover_markup = 'background: ' + css_value + ';\n';
    }
  });

  // wrap the style markups in proper css calls
  Button.styles_markup = '.button {\n' + Button.styles_markup + '}';
  if(Button.styles_hover_markup != ''){
    Button.styles_hover_markup = '\n\n.button:hover {\n' + Button.styles_hover_markup + '}';
  }
}

/**
 * Update the output of the css styles
 */
Button.render_styles = function(){
  var output = Button.styles_markup + Button.styles_hover_markup;
  $('#css-display').html('<pre>' + output + '</pre>');
}