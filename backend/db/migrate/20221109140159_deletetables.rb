class Deletetables < ActiveRecord::Migration[7.0]
  def change
    drop_table :users
    drop_table :admins
    drop_table :employers
  end
end
