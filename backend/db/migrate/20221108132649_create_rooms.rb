class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.integer :user_id, null: false
      t.integer :employer_id, null:false
      t.boolean :got_chat_offer, default: false
      t.timestamps
    end
  end
end
