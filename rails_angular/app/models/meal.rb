class Meal < ActiveRecord::Base
  attr_accessible :description, :name, :price
end
