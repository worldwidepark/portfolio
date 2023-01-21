class ChangTagsToProgrammingLanguages < ActiveRecord::Migration[7.0]
  def change
    rename_table :tags, :programming_Languages
  end
end
