import cv2 as cv
from matplotlib import pyplot as plt
import numpy

img = cv.imread('./imgs/coins.jpg')
image_gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

kernel = numpy.ones((3,3),numpy.uint8)
image_binary = cv.morphologyEx(image_gray, cv.MORPH_DILATE, kernel)

titles = ['Original Image', 'Image Gray', 'Image Binary']
images = [img, image_gray, image_binary]

for i in range(len(images)):
    plt.subplot(1,3,i+1)
    plt.imshow(images[i], 'gray',vmin=0,vmax=255)
    plt.title(titles[i])
    plt.xticks([])
    plt.yticks([])
plt.show()

print('Version: ' + cv.__version__)