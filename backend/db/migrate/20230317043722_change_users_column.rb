class ChangeUsersColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :urls, :string
    add_column :users, :occupation, :string
    add_column :users, :introduce, :text
    remove_column :users, :nickname
    remove_column :users, :age
    remove_column :users, :gender
    remove_column :users, :image
  end
end
