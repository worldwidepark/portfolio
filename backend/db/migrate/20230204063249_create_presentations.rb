class CreatePresentations < ActiveRecord::Migration[7.0]
  def change
    create_table :presentations do |t|
      t.references :user, null: false
      t.references :target, null:false, polymorphic: true
      t.boolean :present, default: true
      t.timestamps
    end
  end
end
