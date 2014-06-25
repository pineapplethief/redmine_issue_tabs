module RedmineIssueHistoryTabs
  module RedmineIssueHistoryTabs
    class Hooks < Redmine::Hook::ViewListener
      render_on :view_issues_show_details_bottom, partial: 'hooks/redmine_issue_tabs/rm_history_tabs', layout: false
    end
  end
end
