# Project Proposal: Data Science Job Hunter #
By Team: Will Work for Food
* Molly Perlich (ScrumMaster) 
* Holly Bergen
* Gilbert Duenas


## Overall Scope: ##

We will be creating an application for those looking for careers in the Data Science industry! 
This will allow job hunters to select a specific DS job title and based on highest number of job results, explore further the specs related to the top cities for that job.

## Data Sets: ##


* Indeed API? (difficult to get access to)
* ZipRecruiter API - Must be job publisher
* https://us.jooble.org/api/about
* github job posting API
* Zillow API

## Examples for Inspiration: ##

- https://public.tableau.com/en-us/s/gallery/are-states-financially-healthy?gallery=votd
- https://bl.ocks.org/mbostock/2206590
- https://gist.github.com/cpietsch/dc76fc25863458a6a83e

## New Library to be used: ##

- Crossfilter - https://square.github.io/crossfilter/

## Technical Details: ##


* Job Titles:
    * Data Scientist
    * Data Engineer
    * Data Analyst
    * Statistician
    * Data & Analytics Manager
* Map Markers:
    * Cities labeled with ordered number of top searches
        - ex: #1 will be the city with the highest number of listings for that job type
    * Click to populate:
        * City Name
        * Job Salary median (glassdoor API)
        * Housing market median

![](https://github.com/mollyperlich/project2_dataJobSearch/blob/holly/Images/dataFlow.JPG)
![](https://github.com/mollyperlich/project2_dataJobSearch/blob/holly/Images/MapIdea.jpg)
