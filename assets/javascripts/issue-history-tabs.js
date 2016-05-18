RMPlus.TABS = (function (my) {
  var my = my || {};
  my.http_tab = 'history';

  my.add_new_tab = function(id, url, tab_header, tab_content) {
    var header_content = '<li>';
    header_content += '<a href="' + url + '?tab=' + id + '" id="tab-' + id + '" onclick="showTab(\'' + id + '\', this.href); this.blur(); return false;" class="no_line in_link" data-remote="true"><span>' + tab_header + '</span></a>';
    header_content += '</li>';
    $('#history_tabs > .tabs > ul:first').append(header_content);

    $('#history_tabs').append('<div class="tab-content" id="tab-content-' + id + '" style="display:none">' + (tab_content || tab_content == '' ? tab_content : '<div class="preloader"></div>') + '</div>');

    if (!tab_content && tab_content != '') {
      var link = $('#tab-' + id);
      link.click(function(event) {
        if ($('#tab-content-' + id).attr('data-loaded')) {
          $(this).removeAttr('data-remote');
          return;
        }
        $('#tab-content-' + id).attr('data-loaded', 1);
      });
    }
  };

  return my;
})(RMPlus.TABS || {});

$(document).ready(function () {
  var has_comments = false;
  var has_history = ($('.journal').length > 0);
  var has_timelog = ($('#issue_timelog').length > 0);
  var has_changesets = ($('#issue-changesets').length > 0);

  $('.journal.has-notes, .journal:has(a[href^="/attachments"])').each(function (index) {
    has_comments = true;
    var el = $(this).clone();
    el.appendTo($('#tab-content-comments'));
    el.find('ul.details li:not(:has(a[href^="/attachments"]))').remove();
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
    if(RMPlus.TABS.http_tab == '') {
      $('#tab-content-history').show();
    }
    else { $('#tab-content-' + RMPlus.TABS.http_tab).show(); }
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

  $('#history_tabs .tabs-buttons').remove();
});