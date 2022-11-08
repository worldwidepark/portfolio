class CreateChargeHistories < ActiveRecord::Migration[7.0]
  def change
    create_table :charge_histories do |t|
      t.integer :employer_id, null:false
      t.integer :amount_of_charge ,null:false
      t.timestamps
    end
  end
end
