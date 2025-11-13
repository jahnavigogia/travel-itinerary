from django.db import models
from django.core.exceptions import ValidationError


class Destination(models.Model):
   user = models.ForeignKey("users.CustomUser", on_delete=models.CASCADE, related_name='destinations')
   name = models.CharField(max_length=100)
   image = models.ImageField(upload_to="dest/", null=True, blank=True)
   arrival_date = models.DateField()
   departure_date = models.DateField()
   created_at = models.DateTimeField(auto_now_add=True)
   
   class Meta:
      unique_together = ["start_date", "end_date"]

   def clean(self):
      if self.arrival_date > self.departure_date:
         raise ValidationError("Destination cannot start after end date.")

   def __str__(self):
      return f"{self.name} ({self.start_date} to {self.end_date})"
      

class Activity(models.Model):
   destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='activities')
   image = models.ImageField(upload_to="activity/", null=True, blank=True)
   name = models.CharField(max_length=100)
   date = models.DateField()
   start_time = models.TimeField(null=True, blank=True)
   end_time = models.TimeField(null=True, blank=True)
   created_at = models.DateTimeField(auto_now_add=True)
   
   def clean(self):
        dest = self.destination
        if not (dest.start_date <= self.date <= dest.end_date):
            raise ValidationError("Activity date must fall within destination date range.")
        if not self.start_time < self.end_time:
            raise ValidationError("Activity cannot start after end time.")
        
   def __str__(self):
        return f"{self.name} on {self.date} at {self.time}"
   

class StayPlaces(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='stays')
    place_name = models.CharField(max_length=150)
    image = models.FileField(upload_to="stay/", null=True, blank=True)
    check_in = models.DateField()
    check_out = models.DateField()

    def clean(self):
        super().clean()
        if not (self.destination.start_date <= self.check_in < self.check_out <= self.destination.end_date):
            raise ValidationError({
                'check_in': 'Check-in/out must fit within destination dates.'
            })

    def __str__(self):
        return f"{self.place_name} ({self.check_in} - {self.check_out})"


# class MiniDest(models.Model):
    # destination = models.ForeignKey(Destination)
    