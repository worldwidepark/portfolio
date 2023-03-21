class ChangeUserUrlType < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :url
    add_column :users, :url,:json
  end
end
