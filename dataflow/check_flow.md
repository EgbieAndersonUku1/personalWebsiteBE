# Progress Checklist

## Steps

1. [X] Change the templates to Django
   - [X] Templates
     - [X] index.html
     - [X] faq.html
     - [X] base.html
   - [X] Integrate static files (CSS, JS, images)
   - [X] Configure `settings.py` for templates and static files


## Create Partials
- [X] Partials folder
  - [X] About Me
      - [X] _about-section.html 
  - [X] Call To Action 
      - [X] _call_to_action.html 
  - [X] Faq 
      - [X] _contact.html
      - [X] _general_information.html
      - [X] _hobbies.html 
      - [X] _technical_skills.html 
  - [X] headers 
      - [X] _faq_header.html 
      - [X] _home_header.html
  - [X] Projects 
      - [X] _projects.html 
  - [X] Skills
      - [X] _skills.html
  - [X] _banner.html
  - [X] _footer.html
  - [X] _project-sidebar.html
  - [X] _search.html
  - [X] _spinner.html


## Create Models
- [ ] **Project Model**
  - [ ] Name
  - [ ] Description (max length = 400)
  - [ ] Project image
  - [ ] FrontEndLanguages Choices (Checkbox)
    - [ ] HTML
    - [ ] CSS
    - [ ] JS
    - [ ] Bootstrap
  - [ ] Backend Languages Choices (Checkbox)
    - [ ] Python
    - [ ] Express
  - [ ] Frameworks Choices
    - [ ] Express
    - [ ] Django
    - [ ] Flask
  - [ ] Libraries Packages (Checkbox)
    - [ ] Node JS
    - [ ] Behave
    - [ ] API
    - [ ] BeautifulSoup
    - [ ] Selenium
    - [ ] Mongoengine
    - [ ] ORM
    - [ ] Chrome
    - [ ] Pymongo
    - [ ] Sinon
    - [ ] Gherkins
    - [ ] Sqlalchemy
  - [ ] Has Website (choice)
    - [ ] Yes
    - [ ] No
    - [ ] Both
  - [ ] Created at
  - [ ] Modified at
  - [ ] Relationships:
    - [ ] User (ForeignKey)
    - [ ] Skills (ForeignKey)
    - [ ] FAQ (ForeignKey)
    - [ ] About Me (ForeignKey)
    - [ ] Tag (ManyToManyField)
    - [ ] Website (URLField)
  - [ ] Define property `get_technologies`:
    - [ ] Retrieve all skills
    - [ ] Return a list of skills

- [ ] **FAQModel (model.Model)**
  - [ ] Question
  - [ ] Answer
  - [ ] Created at
  - [ ] Modified at

- [ ] **Skills (model.Model)**
  - [ ] Name
  - [ ] Image
  - [ ] Modified at
  - [ ] Created on

- [ ] **AboutModel (model.Model)**
  - [ ] About
  - [ ] Created on
  - [ ] Modified on

- [ ] **Tags (model.Model)**
  - [ ] Tag
  - [ ] Modified at
  - [ ] Created at


## Remove original html files once the data has been added to the db
   - [ ] HTML Files
     - [ ] faq.html
     - [ ] index.html

## Forms
- [ ] **SearchForm (form.ModelAdmin)**
  - [ ] Meta (exclude `created_at` and `modified_at`)
  - [ ] Define filters for search fields (e.g., languages, frameworks)
  - [ ] Keywords (Search by Keywords, separated by commas)
  - [ ] Dates
     - [ ] From date
     - [ ] To date
  - [ ] Result per page (range 1 to 10)
  - [ ] Sort project by:
    - [ ] Latest
    - [ ] Oldest
  - [ ] Project Status (choices)
    - [ ] In Progress
    - [ ] Completed

- [ ] **AddProjectForm**
  - [ ] Meta configuration
  - [ ] Include necessary fields
  - [ ] Validate file uploads (project image)


## Views
- [ ] **Templates**
  - [ ] FAQ templates (separate page)
  - [ ] Home templates (landing page)
  - [ ] Skills (list of available skills, technologies)
  - [ ] Search (integrated with form)


- [ ] **Functionality**
  - [ ] Add project (`add_project(request)`)
  - [ ] Search and filter projects (`view_search(request)`)
    - [ ] Validate form inputs
    - [ ] Handle empty or invalid queries
    - [ ] Return results in JSON format
  - [ ] Create view for displaying individual projects
  - [ ] Create paginated list view for projects



## Project Views

1. [] **`add_project(request)`**
   * Accepts `POST` data.
   * Validates using `AddProjectForm`.
   * Saves the project and redirects to the success page.

2. **`view_search(request)`**
   * Fetches data from `SearchForm`.
   * Filters projects based on query parameters.
   * Returns a JSON response:

```json
{
    "name": "",
    "description": "",
    "frontend_languages": [],
    "backend_languages": [],
    "frameworks": [],
    "libraries": [],
    "hasWebsite": false,
    "websiteUrl": "",
    "dateCreated": "",
    "projectStatus": "In Progress",
    "tags": []
}

3. **`home_page(request)`**:
  - [X] home_page
       - return homepage

4. - [X] faq
      - return faq page
```

## API Points
- [ ] **GET**
  - [ ] `/project/search/`
  - [ ] `/project/home/`
  - [ ] `/project/`
- [ ] **POST**
  - [ ] `/project/search/` -> Returns JSON
  - [ ] `/project/FAQ/`

## Unit and Integration Testing
- [ ] Write unit tests for models
  - [ ] `ProjectModel`
  - [ ] `FAQModel`
  - [ ] `Skills`
  - [ ] `AboutModel`
  - [ ] `Tags`
- [ ] Write tests for forms
  - [ ] Validation tests for `SearchForm`
  - [ ] Validation tests for `AddProjectForm`
- [ ] Write tests for views
  - [ ] Test project addition
  - [ ] Test search functionality
- [ ] Write API tests
  - [ ] Test GET endpoints
  - [ ] Test POST endpoints

## Frontend Integration
- [ ] Add JavaScript for interactive elements
- [ ] Integrate dynamic search using JavaScript fetch
- [ ] Add responsive design for mobile and desktop




## Cache Implementation Checklist

## 1. **Select Caching Strategy**
- [ ] **Determine the Cache Type**  
  - [ ] In-memory Cache (e.g., Redis, Memcached)
  - [ ] File-based Cache (e.g., Django's local file-based caching)
  - [ ] Distributed Cache (e.g., Redis for multiple instances)
  - [ ] Database-backed Cache (e.g., caching queries in the database)

- [ ] **Define Cacheable Data**  
  - [ ] Determine which parts of your app benefit from caching (e.g., frequent database queries, rendered templates, API responses)
  
## 2. **Set Up Cache Backend**
- [ ] **Install Required Cache Libraries**  
  - [ ] Redis (e.g., `pip install redis` for Django)
  - [ ] Memcached (e.g., `pip install python-memcached`)
  
- [ ] **Configure Cache Settings in `settings.py`**  
  - [ ] Redis Cache Setup:
    ```python
    CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': 'redis://127.0.0.1:6379/1',
            'OPTIONS': {
                'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            }
        }
    }
    ```

  - [ ] Memcached Setup:
    ```python
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
            'LOCATION': '127.0.0.1:11211',
        }
    }
    ```

## 3. **Set Cache Expiration Rules**
- [ ] **Decide on Cache Expiration**  
  - [ ] Time-based expiration (e.g., cache data for 5 minutes)
  - [ ] Event-based expiration (e.g., clear cache when an object is updated)

- [ ] **Configure Cache Timeout**  
  - Set expiration times in `settings.py`, e.g., for 10 minutes:
    ```python
    CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': 'redis://127.0.0.1:6379/1',
            'OPTIONS': {
                'CLIENT_CLASS': 'django_redis.client.DefaultClient',
                'TIMEOUT': 600,  # 10 minutes
            }
        }
    }
    ```

## 4. **Implement Cache in Views**
- [ ] **Cache Template Views**  
  - Use `cache_page` decorator to cache entire views:
    ```python
    from django.views.decorators.cache import cache_page

    @cache_page(60 * 15)  # Cache for 15 minutes
    def my_view(request):
        ...
    ```

- [ ] **Cache Specific Parts of Templates**  
  - Use `{% cache %}` tag in templates to cache sections:
    ```html
    {% cache 600 sidebar %}
    <div class="sidebar">
        <!-- Sidebar content here -->
    </div>
    {% endcache %}
    ```

- [ ] **Cache Querysets or Database Results**  
  - Use `cache.get()` and `cache.set()` to cache query results:
    ```python
    from django.core.cache import cache
    ```

## 5. **Implement Cache Invalidation**
- [ ] **Manual Cache Invalidations**  
  - Use `cache.delete()` to manually clear cache when data changes:

- [ ] **Use Cache Signals for Model Changes**  
  - Use Django signals (e.g., `post_save`, `post_delete`) to invalidate cache when a model is updated or deleted:
    ```python
    from django.db.models.signals import post_save
    from django.dispatch import receiver
    from django.core.cache import cache
    ```

## 6. **Optimize Cache Usage**
- [ ] **Test Cache Hit and Miss Performance**  
  - Use logging or profiling to test cache hits and misses and ensure cache is being used effectively.

- [ ] **Implement Cache Versioning**  
  - Version the cache key to prevent old cached content from being used after updates:
   
- [ ] **Monitor Cache Size and Eviction Policy**  
  - Set eviction strategies (e.g., Least Recently Used (LRU)) and monitor cache size to avoid memory overload.

## 8. **Test Caching on Deployment (Vercel)**
- [ ] **Ensure Cache Works with Vercel**  
  - Test cache behaviour on Vercel, ensuring cacheable data is handled correctly with the chosen backend (e.g., Redis or Memcached).
  - Use environment variables for Vercel to configure caching services, ensuring compatibility with the Vercel environment.

## 9. **Set Up Cache Monitoring and Logging**
- [ ] **Enable Cache Logging**  
  - Enable logging to track cache operations, including cache hits, misses, and deletions.
  

## Deployment
- [ ] Configure settings for production
- [ ] Set up database migrations
- [ ] Deploy to a platform (e.g., Heroku, AWS, DigitalOcean, vercel)
- [ ] Test the deployed application


## Security and Optimisation
- [ ] Ensure form data sanitisation
- [ ] Validate user inputs
- [ ] Optimise database queries
- [ ] Protect sensitive data (e.g., use environment variables for credentials)
- [ ] Add rate limiting for API endpoints



## Documentation
- [ ] Add comments to code
- [ ] Create a `README.md` for the project
  - [ ] Project description
  - [ ] Installation instructions
  - [ ] Usage
  - [ ] API documentation
- [ ] Write user-facing documentation for navigating the site
  - [ ] Readme.md


## Workflow

1. User fills in AddProjectForm.
2. Form validation occurs.
3. On successful submission:
   - Save project to database.
   - Return to project list page.
4. On failure:
   - Display error messages.
5. For search:
   - User submits SearchForm.
   - Results are fetched via view_search.
   - Display projects in paginated format.


## Testing

1. **Unit Tests**
   * Test model relationships (e.g., FK, M2M fields).
   * Validate `SearchForm` and `AddProjectForm`.
   * Check the behaviour of `get_technologies`.

2. **Integration Tests**
   * Simulate user workflows:
     * Add project → Search project → View project details.
   * Test API endpoints for correct responses.

3. **Edge Case Testing**
   * Handling empty fields for optional fields (e.g., `website`).
   * Validating invalid inputs (e.g., exceeding `description` max length).
   * Ensuring only valid choices are allowed for fields like `FrontendLanguages`.
