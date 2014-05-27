class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.string :url
      t.boolean :secret, default: false
      t.references :user
      t.timestamps
    end
  end
end
