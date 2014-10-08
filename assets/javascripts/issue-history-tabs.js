RMPlus.TABS = (function (my) {
  var my = my || {};

  // my.call_func = function(func) {
  //   if (my[func])
  //     my[func].apply(this, Array.prototype.slice.call(arguments, 1));
  //   else
  //     my.hide_everything();
  // };

  // click handler for tabs
  // my.click_handler = function() {
  //   // getting tab name without 'tab-' prefix and building function name
  //   var tab_name = this.id.substring(4, this.id.length);
  //   var function_name = 'show_' + tab_name;
  //   my.call_func(function_name);
  // };

  // my.show_comments = function () {
  //   $('.journal').each(function (index) {
  //     var $journal = $(this);
  //     $journal.hide();
  //     if ($journal.hasClass('has-notes')) {
  //       $journal.show();
  //     }
  //     if ($journal.find('a[href^="/attachments"]').length > 0) {
  //       $journal.show();
  //       $journal.find('.details li').hide();
  //       $journal.find('li:has(a[href^="/attachments"])').show();
  //     } else {
  //       $journal.find('ul.details').hide();
  //     }
  //   });
  //   $('#issue_timelog').addClass('I');
  //   $('#issue-changesets').addClass('I');
  // };

  // my.show_history = function () {
  //   $('.journal').show().find('.details').show().find('li').show();
  //   $('#issue_timelog').addClass('I');
  //   $('#issue-changesets').addClass('I');
  // };

  // my.show_timelog = function() {
  //   $('.journal').hide();
  //   $('#issue_timelog').removeClass('I');
  //   $('#issue-changesets').addClass('I');
  // };

  // my.show_changesets = function() {
  //   $('.journal').hide();
  //   $('#issue_timelog').addClass('I');
  //   $('#issue-changesets').removeClass('I');
  // };

  // my.hide_everything = function() {
  //   $('.journal').hide();
  //   $('#issue_timelog').addClass('I');
  //   $('#issue-changesets').addClass('I');
  // };

  my.load_issue_view_stats = function(url, tab_header, show_tab) {
    var header_content = '<li>';
    header_content += '<a href="' + url + '?tab=view_stats" id="tab-view_stats" onclick="showTab(\'view_stats\', this.href); this.blur(); return false;" class="no_line in_link" data-remote="true"><span>' + tab_header + '</span></a>';
    header_content += '</li>';
    $('#history_tabs > .tabs > ul:first').append(header_content);

    $('#history_tabs').append('<div class="tab-content" id="tab-content-view_stats" style="' + (show_tab ? '' : 'display:none') + '"><div class="preloader"></div></div>');

    var link = $('#tab-view_stats');
    link.click(function(event) {
      if ($('#tab-content-view_stats').attr('data-loaded')) {
        $(this).removeAttr('data-remote');
        return;
      }
      $('#tab-content-view_stats').attr('data-loaded', 1);
    });
    if (show_tab) {
      link.trigger('click');
    }
  }

  return my;
})(RMPlus.TABS || {});

$(document).ready(function () {
  var everythingLoaded = setInterval(function() {
  if (/loaded|complete|interactive/.test(document.readyState)) {
    clearInterval(everythingLoaded);
    if ($('div.tabs li:visible').length <= 1){
        $('.tabs-buttons').hide();
        $(window).off("resize", displayTabsButtons);
      }
    }
  }, 100);

  var has_comments = false;
  var has_history = ($('.journal').length > 0);
  var has_timelog = ($('#issue_timelog').length > 0);
  var has_changesets = ($('#issue-changesets').length > 0);

  $('.journal.has-notes').each(function (index) {
    has_comments = true;
    var el = $(this).clone();
    el.appendTo($('#tab-content-comments'));
    el.find('li:not(:has(a[href^="/attachments"]))').remove();
  });

  if (has_timelog) {
    $('#issue_timelog').appendTo($('#tab-content-timelog'));
  }
  else {
    $('#tab-timelog').remove();
  }


  if (has_history) {
    $('#history').appendTo($('#tab-content-history'));
  }
  else {
    $('#tab-history').remove();
  }

  if (has_comments) {

  }
  else {
    $('#tab-comments').remove();
  }

  if (has_changesets) {
    $('#issue-changesets').appendTo($('#tab-content-changesets'));
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

  if ($('.tabs a.selected').length == 0){
    $('.tabs a').first().addClass('selected');
  }

  // $('div#content .tabs a.selected').each( function() {
  //   RMPlus.TABS.click_handler.apply(this);
  // });

  // $(document.body).on('click', 'div#content .tabs a', function(event){
  //   RMPlus.TABS.click_handler.apply(this);
  // });

  $('.tabs-buttons').hide();
});