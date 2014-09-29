class CreateSits < ActiveRecord::Migration
  def change
    create_table :sits do |t|
      t.string :name
      t.string :title
      t.integer :age

      t.timestamps
    end
  end
end
