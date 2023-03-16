class AddColumnDateAchivements < ActiveRecord::Migration[7.0]
  def change
    add_column :achivements, :start_date_on, :date, null:false
    add_column :achivements, :end_date_on, :date, null:false
  end
end
