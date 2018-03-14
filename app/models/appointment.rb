class Appointment < ApplicationRecord
  validates_presence_of :title, :appt_time
  validates :title, length: { minimum: 3 }
  validate :app_time_cannot_be_in_the_past

  private

  def app_time_cannot_be_in_the_past
    if appt_time.present? && appt_time < Time.now
      errors.add(:appt_time, "can't be in the past")
    end
  end
end
