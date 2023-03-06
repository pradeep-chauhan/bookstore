class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :isbn
      t.integer :quantity, default: 0
      t.decimal :price, precision: 10, scale: 2
      t.references :auther, null: false, foreign_key: true

      t.timestamps
    end
  end
end
