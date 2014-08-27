class CreateSiteTags < ActiveRecord::Migration
  def change
    create_table :site_tags do |t|
      t.belongs_to :site
      t.belongs_to :tag
      t.timestamps
    end
  end
end
