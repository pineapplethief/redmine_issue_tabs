RMPlus.TABS = (function (my) {
  var my = my || {};

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

  $('.journal.has-notes, .journal:has(a[href^="/attachments"])').each(function (index) {
    has_comments = true;
    var el = $(this).clone();
    el.appendTo($('#tab-content-comments'));
    el.find('li:not(:has(a[href^="/attachments"]))').remove();
  });

  if (has_timelog) {
    $('#issue_timelog').appendTo('#tab-content-timelog');
  }
  else {
    $('#tab-timelog').remove();
  }


  if (has_history) {
    $('#history').appendTo('#tab-content-history');
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
    $('#issue-changesets').appendTo('#tab-content-changesets');
  }
  else {
    $('#tab-changesets').remove();
  }

  if (!has_comments && !has_history && !has_timelog && !has_changesets){
    $('#history_tabs').remove();
  }
  else {
    $('#history_tabs').insertAfter('div.issue:first')
  }

  if ($('.tabs a.selected').length == 0){
    $('.tabs a').first().addClass('selected');
  }

  $('.tabs-buttons').hide();
});