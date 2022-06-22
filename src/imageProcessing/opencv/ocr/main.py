import cv2 as cv
import pytesseract as tess

tess.pytesseract.tesseract_cmd = '/usr/bin/tesseract'
# pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

img = cv.imread("./imgs/teste3.png")
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
ret, binary = cv.threshold(gray, 0, 255, cv.THRESH_OTSU | cv.THRESH_BINARY_INV)
text = tess.image_to_string(binary, lang='por')
print(text)