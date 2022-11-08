class CreateBookmarks < ActiveRecord::Migration[7.0]
  def change
    create_table :bookmarks do |t|
      t.integer :bookmarker_id
      t.integer :bookmarked_id

      t.timestamps
    end
    add_index :bookmarks, :bookmarker_id
    add_index :bookmarks, :bookmarked_id
    add_index :bookmarks, [:bookmarker_id, :bookmarked_id], unique: true
  end
end
