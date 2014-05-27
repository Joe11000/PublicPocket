class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.string :url
      t.boolean :secret
      t.references :user
      t.timestamps
    end
  end
end
