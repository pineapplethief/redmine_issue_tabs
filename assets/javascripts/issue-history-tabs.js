RMPlus.TABS = (function (my) {
  var my = my || {};

  my.call_func = function(func){
    my[func].apply(this, Array.prototype.slice.call(arguments, 1));
  };

  // click handler for tabs
  my.click_handler = function(){
    // getting tab name without 'tab-' prefix and building function name
    var tab_name = this.id.substring(4, this.id.length);
    var function_name = 'show_' + tab_name;
    my.call_func(function_name);
  };

  my.show_comments = function () {
    $('.journal').each(function (index) {
      var $journal = $(this);
      $journal.hide();
      if ($journal.hasClass('has-notes')) {
        $journal.show();
      }
      if ($journal.find('a[href^="/attachments"]').length > 0) {
        $journal.show();
        $journal.find('.details li').hide();
        $journal.find('li:has(a[href^="/attachments"])').show();
      } else {
        $journal.find('ul.details').hide();
      }
    });
    $('#issue_timelog').hide();
  };

  my.show_history = function () {
    $('.journal').show().find('.details').show().find('li').show();
    $('#issue_timelog').hide();
  };

  my.show_timelog = function(){
    $('.journal').hide();
    $('#issue_timelog').show();
  };

  my.show_changesets = function(){
    $('.journal').hide();
    $('#issue_timelog').hide();
    $('#issue-changesets').show();
  };

  return my;
})(RMPlus.TABS || {});

$(document).ready(function(){
  var has_comments = false;
  var has_history = ($('.journal').length > 0);
  var has_timelog = ($('#issue_timelog').length > 0);
  var has_changesets = ($('#issue-changesets').length > 0);

  if (has_timelog){
    var timelog_content = $('#issue_timelog');
    $('#issue_timelog').remove();
    $('#history').append(timelog_content);
    $('#issue_timelog').hide();
  }
  else {
    $('#tab-timelog').remove();
  }
  $('.journal').each(function (index) {
    var $journal = $(this);
    $journal.hide();
    if ($journal.hasClass('has-notes')) {
      has_comments = true; return false;
    }
  });

  if (!has_history){
    $('#tab-history').remove();
  }
  if (!has_comments){
    $('#tab-comments').remove();
  }
  if (has_changesets){
    var changesets_content = $('#issue-changesets');
    $('#issue-changesets').remove();
    $('#history').append(changesets_content);
    $('#issue-changesets').hide();
  }
  else {
    $('#tab-changesets').remove();
  }

  if (!has_comments && !has_history && !has_timelog && !has_changesets){
    $('#history_tabs').remove();
  }
  else {
    var tabs = $('div#history_tabs');
    $('div#history_tabs').remove();
    $('div.issue').after(tabs);
  }

  $('.tabs a.selected').each(function(){
    RMPlus.TABS.click_handler.apply(this);
  });

  $('.tabs a').on('click', function(event){
    RMPlus.TABS.click_handler.apply(this);
  });
});