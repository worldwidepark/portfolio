class CreateChats < ActiveRecord::Migration[7.0]
  def change
    create_table :chats do |t|
      t.string :chatter_type, null: false
      t.integer :room_id, null: false
      t.string :message
      t.timestamps
    end
  end
end
