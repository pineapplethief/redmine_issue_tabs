Redmine::Plugin.register :redmine_issue_tabs do
  name 'Redmine Issue Tabs plugin'
  author 'Pitin Vladimir, Alexey Glukhov'
  description 'Plugin enhances issue interface by adding several useful tabs: timelog, time spent, code commits, history'
  version '0.0.1'
  url 'https://github.com/pineapple-thief/redmine_issue_tabs'
  author_url 'http://example.com/about'
end

class Hooks < Redmine::Hook::ViewListener
  render_on :view_issues_show_details_bottom, :partial => 'hooks/timelog_on_issue_page/issues/timelog', :layout => false
end

Rails.application.config.to_prepare do
  IssuesController.send(:include, TimelogOnIssuePage::IssuesControllerPatch)
end