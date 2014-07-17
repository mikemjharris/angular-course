class CreateMeals < ActiveRecord::Migration
  def change
    create_table :meals do |t|
      t.text :name
      t.float :price
      t.text :description

      t.timestamps
    end
  end
end
