class AddColumnDateDailyReports < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_reports, :report_date_on, :date, null:false
  end
end
