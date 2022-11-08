class CreateRates < ActiveRecord::Migration[7.0]
  def change
    create_table :rates do |t|
      t.integer :user_id, null: false
      t.integer :employer_id, null:false
      t.integer :rate, null:false
      t.timestamps
    end
  end
end
