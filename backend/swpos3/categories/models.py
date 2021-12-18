from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='categories')

    class Meta:
            managed = False
            verbose_name = "Categories"
            verbose_name_plural = "Categories"
            
    def __str__(self):
        return self.title