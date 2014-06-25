module RedmineIssueTabs
	module IssuesControllerPatch
		def self.included(base) # :nodoc:
			base.extend(ClassMethods)
			base.send(:include, InstanceMethods)

			base.class_eval do
				before_filter :get_time_entries, :only => [:show]
			end

		end

		module ClassMethods
		end

		module InstanceMethods
			def get_time_entries
				@time_entries = @issue.time_entries.find(:all, :include => [:user, :activity], :order => "#{TimeEntry.table_name}.spent_on DESC")
			end

			def get_time_spent
				#@time_spent = @issue
			end
		end
	end
end

