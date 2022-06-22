# Import required packages
import cv2 as cv
import pytesseract as tess

tess.pytesseract.tesseract_cmd = '/usr/bin/tesseract'
# tess.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

# Read image from which text needs to be extracted
img = cv.imread("imgs/teste4.png")
cv.imshow("image", img)

gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
cv.imshow("gray", gray)

ret, thresh1 = cv.threshold(gray, 0, 255, cv.THRESH_OTSU | cv.THRESH_BINARY_INV)
cv.imshow("threh", thresh1)

rect_kernel = cv.getStructuringElement(cv.MORPH_RECT, (18, 18))
dilation = cv.dilate(thresh1, rect_kernel, iterations = 1)
cv.imshow("threh", dilation)

contours, hierarchy = cv.findContours(dilation, cv.RETR_EXTERNAL,
 												cv.CHAIN_APPROX_NONE)
im2 = img.copy()

file = open("recognized.txt", "w+")
file.write("")
file.close()
i = 0
for cnt in contours:
	x, y, w, h = cv.boundingRect(cnt)
	i = i + 1
	rect = cv.rectangle(im2, (x, y), (x + w, y + h), (0, 255, 0), 2)
	cropped = im2[y:y + h, x:x + w]
	cv.imshow("rect "+ str(i), cropped)
	file = open("recognized.txt", "a")
	text = tess.image_to_string(cropped)
	print(tess.image_to_boxes(cropped))
	print(text)
	file.write(text)
	file.write("\n")
	file.close
cv.waitKey(0)