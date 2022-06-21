import cv2 as cv
import imutils
import numpy
from matplotlib import pyplot as plt

img = cv.imread('./imgs/img_1.jpg')

image_gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

# image_blur = cv.medianBlur(image_gray, 125)

# ret, image_thresh = cv.threshold(image_blur, 127, 255, 0)
contours, hierarchy = cv.findContours(image_gray, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
contorno = cv.drawContours(img, contours, -1, (0,255,0), 3)
# cv.imshow('contorno', contorno)

# image_res, thresh = cv.threshold(hierarchy, 230, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)
# print("Limiar: ", image_res)

# kernel = numpy.ones((3,3), numpy.uint8)
# morpho = cv.morphologyEx(image_thresh, cv.MORPH_DILATE, kernel)

# kernel2 = numpy.ones((3,3),numpy.uint8)
# morpho_2 = cv.morphologyEx(morpho, cv.MORPH_DILATE, kernel2)

# kernel3 = numpy.ones((3,3),numpy.uint8)
# morpho_3 = cv.morphologyEx(morpho_2, cv.MORPH_DILATE, kernel3)


titles = [
          '1 - Original Image',
          '2 - Image Gray',
          # '3 - Image Blur',
          # '4 - Thresh',
          '5 - Contours',
          # '6 - Limiarização',
        #   '7 - Morfologia',
         ]
images = [
          img, 
          image_gray,
          # image_blur,
          # image_thresh,
          contorno,
          # thresh,
        #   morpho_2,
        #   morpho_3,
        ]

cnts = cv.findContours(contours.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

cnts = imutils.grab_contours(cnts)
objects = str(len(cnts))

print("Quantidade de objetos: " + objects)

for i in range(len(images)):
    plt.subplot(2, 1, i+1)
    plt.imshow(images[i], 'gray', vmin=0, vmax=255)
    plt.title(titles[i])
    plt.xticks([])
    plt.yticks([])
plt.show()

print('Version: ' + cv.__version__)
cv.waitKey(0)