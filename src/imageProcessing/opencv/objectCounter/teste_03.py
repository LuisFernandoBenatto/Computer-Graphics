import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt
import imutils

img = cv.imread('./assets/imgs/img_2.jpg')

img_blur = cv.GaussianBlur(img, (3,3), cv.BORDER_DEFAULT)

img_gray = cv.cvtColor(img_blur, cv.COLOR_BGR2GRAY)

ret, img_thresh = cv.threshold(img_gray, 90, 255, cv.THRESH_BINARY_INV)
print("ret: ", ret)

kernel = np.ones((7,7), np.uint8)
dilation = cv.dilate(img_thresh, kernel, iterations = 20)

dist_transform = cv.distanceTransform(dilation, cv.DIST_L2, 5)

_, last_image = cv.threshold(dist_transform, 0.4 * dist_transform.max(), 255, 0)
last_image = np.uint8(last_image)

titles = [
          '1 - Original Image',
          '2 - Blur',
          '3 - Gray',
          '4 - Binary',
          '5 - Dilation',
          '6 - Distance Transform',
          '7 - Last Image',
         ]
images = [
          img, 
          img_blur,
          img_gray,
          img_thresh,
          dilation,
          dist_transform,
          last_image
        ]

cnts = cv.findContours(last_image.copy(), cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

cnts = imutils.grab_contours(cnts)
objects = str(len(cnts))

print("Quantidade de objetos: " + objects)

for i in range(len(images)):
    plt.subplot(3, 3, i+1)
    plt.imshow(images[i], 'gray', vmin=0, vmax=255)
    plt.title(titles[i])
    plt.xticks([])
    plt.yticks([])
plt.show()

print('Version: ' + cv.__version__)
cv.waitKey(0)