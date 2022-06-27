import cv2 as cv
from matplotlib import pyplot as plt
import imutils
import numpy

img = cv.imread('./assets/imgs/coins2.jpg')

image_blur = cv.medianBlur(img, 35)

image_gray = cv.cvtColor(image_blur, cv.COLOR_BGR2GRAY)

image_res ,image_thresh = cv.threshold(image_gray, 230, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU)
# image_binary = cv.morphologyEx(image_blur, cv.MORPH_DILATE, kernel)
print("Limiar: ", image_res)

kernel = numpy.ones((3,3), numpy.uint8)
morpho = cv.morphologyEx(image_thresh, cv.MORPH_DILATE, kernel)

# kernel2 = numpy.ones((3,3),numpy.uint8)
# morpho_2 = cv.morphologyEx(morpho, cv.MORPH_DILATE, kernel2)

# kernel3 = numpy.ones((3,3),numpy.uint8)
# morpho_3 = cv.morphologyEx(morpho_2, cv.MORPH_DILATE, kernel3)

dist_transform = cv.distanceTransform(morpho, cv.DIST_L2, 5)

_, last_image = cv.threshold(dist_transform, 0.3 * dist_transform.max(), 255, 0)
last_image = numpy.uint8(last_image)
# contours = cv.findContours(last_image.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
# contours = imutils.grab_contours(contours)

titles = [
          '1 - Original Image',
          '2 - Image Gray',
          '3 - Mediana',
          '4 - Limiar',
          '5 - Morfologia',
        #   '5 - Morfologia',
        #   '5 - Morfologia',
          '6 - DistTransform',
          '7 - LastImage'
         ]
images = [
          img, 
          image_gray,
          image_blur,
          image_thresh,
          morpho,
        #   morpho_2,
        #   morpho_3,
          dist_transform,
          last_image
        ]

cnts = cv.findContours(last_image.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

cnts = imutils.grab_contours(cnts)
objects = str(len(cnts))

# text = "Objetos encontrados:" + str(objects)
# cv.putText(img, text, (10, 25),  cv.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 1)

print("Quantidade de objetos: " + objects)

for i in range(len(images)):
    plt.subplot(3,3,i+1)
    plt.imshow(images[i], 'gray',vmin=0,vmax=255)
    plt.title(titles[i])
    plt.xticks([])
    plt.yticks([])
plt.show()

print('Version: ' + cv.__version__)