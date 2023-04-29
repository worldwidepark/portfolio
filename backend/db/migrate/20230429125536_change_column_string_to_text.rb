class ChangeColumnStringToText < ActiveRecord::Migration[7.0]
  def change
    change_column :daily_reports, :text, :text
    change_column :achivements, :text, :text
  end
end
