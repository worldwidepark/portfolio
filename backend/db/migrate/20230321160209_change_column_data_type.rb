class ChangeColumnDataType < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :url, :string
  end
end
