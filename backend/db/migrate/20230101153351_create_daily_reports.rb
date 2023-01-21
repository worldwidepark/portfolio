class CreateDailyReports < ActiveRecord::Migration[7.0]
  def change
    create_table :daily_reports do |t|
      t.string :text
      t.references :user, null:false
      t.timestamps
    end
  end
end
