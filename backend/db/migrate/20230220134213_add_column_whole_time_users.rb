class AddColumnWholeTimeUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :combined_time, :float, default: 0, null:false
  end
end
