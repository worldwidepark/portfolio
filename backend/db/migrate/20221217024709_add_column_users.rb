class AddColumnUsers < ActiveRecord::Migration[7.0]
  def up
    add_column :users, :age, :integer
    add_column :users, :gender, :string
  end

  def down
    remove_column :users, :age, :integer
    remove_column :users, :gender, :string
  end
end
