class ChangeUsersColumnUrls < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :url, :json
    remove_column :users, :urls
  end
end
