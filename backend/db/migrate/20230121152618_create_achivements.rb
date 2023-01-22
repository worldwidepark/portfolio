class CreateAchivements < ActiveRecord::Migration[7.0]
  def change
    create_table :achivements do |t|
      t.string :title
      t.string :text
      t.string :url
      t.references :user, null:false
      t.timestamps
    end
  end
end
