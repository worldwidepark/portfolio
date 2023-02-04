class Achivement < ApplicationRecord
  belongs_to :user
  serialize :urls, Array
end
