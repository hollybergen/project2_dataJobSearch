from bs4 import BeautifulSoup
from splinter import Browser
from splinter.exceptions import ElementDoesNotExist

def scrape(url):
    executable_path = {"executable_path": "chromedriver.exe"}    
    browser = Browser('chrome', **executable_path, headless=False)
    browser.visit(url)
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    return soup