$(function(){

  $('input,textarea').attr('autocomplete', 'off');

  attach_handlers();
  initialize_controls();

});

/**
 * Initialize any DOM functionality (clicks, changes, etc..)
 */
function attach_handlers(){

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
    control_change($(this));
  });
}

/**
 * Initialize (enable / disable) controls on load
 */
function initialize_controls(){
  $('#settings-wrap [data-control]').each(function(){
    control_change($(this));
  });
}

/**
 * Change a control value (enable / disable controls)
 */
function control_change(el){
  var checked = el.is(':checked');
  var control = el.attr('data-control');
  $('[data-control-group="' + control + '"]').each(function(){
    checked ? $(this).removeClass('disabled') : $(this).addClass('disabled');
    $(this).find('input, select').each(function(){
      this.disabled = !checked;
    });
  });

  $('[data-control-group-switch="' + control + '"]').each(function(){
    checked ? $(this).addClass('disabled') : $(this).removeClass('disabled');
    $(this).find('input, select').each(function(){
      this.disabled = checked;
    });
  });
}