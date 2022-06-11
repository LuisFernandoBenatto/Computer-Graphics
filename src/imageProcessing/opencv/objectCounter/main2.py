import cv2 as cv
from matplotlib import pyplot as plt
import imutils
import numpy

img = cv.imread('./imgs/coins2.jpg')

image_gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

image_blur = cv.medianBlur(image_gray, 5)

image_res ,image_thresh = cv.threshold(image_blur, 230, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)
print("Limiar: ", image_res)

kernel = numpy.ones((3,3), numpy.uint8)
morpho = cv.morphologyEx(image_thresh, cv.MORPH_DILATE, kernel)

kernel2 = numpy.ones((3,3),numpy.uint8)
morpho_2 = cv.morphologyEx(morpho, cv.MORPH_DILATE, kernel2)

kernel3 = numpy.ones((3,3),numpy.uint8)
morpho_3 = cv.morphologyEx(morpho_2, cv.MORPH_DILATE, kernel3)

titles = [
          '1 - Original Image',
          '2 - Image Gray',
          '3 - Mediana',
          '4 - Limiar',
          '5 - Morfologia',
          '6- Morfologia',
          '7 - Morfologia',
         ]
images = [
          img, 
          image_gray,
          image_blur,
          image_thresh,
          morpho,
          morpho_2,
          morpho_3,
        ]

cnts = cv.findContours(morpho_3.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

cnts = imutils.grab_contours(cnts)
objects = str(len(cnts))

print("Quantidade de objetos: " + objects)

for i in range(len(images)):
    plt.subplot(3,3,i+1)
    plt.imshow(images[i], 'gray',vmin=0,vmax=255)
    plt.title(titles[i])
    plt.xticks([])
    plt.yticks([])
plt.show()

print('Version: ' + cv.__version__)