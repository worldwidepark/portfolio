class AddColumnDailyReports < ActiveRecord::Migration[7.0]
  def change
    add_column :daily_reports, :time, :float, null:false
  end
end
