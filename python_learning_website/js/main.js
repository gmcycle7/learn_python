/* ========================================
   Python Learning Website — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ==============================================
     MOBILE SIDEBAR TOGGLE
     ============================================== */
  var sidebar = document.querySelector('.sidebar');
  var toggle  = document.querySelector('.sidebar-toggle');

  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (window.innerWidth <= 900 &&
          sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          e.target !== toggle) {
        sidebar.classList.remove('open');
      }
    });
  }

  /* ==============================================
     ACTIVE NAV LINK HIGHLIGHTING
     ============================================== */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar .nav-link').forEach(function (link) {
    var href = link.getAttribute('href').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  /* ==============================================
     READING PROGRESS BAR
     ============================================== */
  var progressFill = document.querySelector('.progress-fill');
  if (progressFill) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressFill.style.width = pct + '%';
    });
  }

  /* ==============================================
     COPY BUTTONS FOR CODE BLOCKS
     ============================================== */
  document.querySelectorAll('pre').forEach(function (block) {
    if (block.querySelector('.copy-btn')) return;
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var code = block.querySelector('code')
        ? block.querySelector('code').textContent
        : block.textContent;
      navigator.clipboard.writeText(code).then(function () {
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      });
    });
    block.style.position = 'relative';
    block.appendChild(btn);
  });

  /* ==============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', this.getAttribute('href'));
      }
    });
  });

  /* ==============================================
     DARK MODE
     ============================================== */
  function initDarkMode() {
    // Create toggle button inside sidebar header
    var header = document.querySelector('.sidebar-header');
    if (!header || header.querySelector('.dark-mode-toggle')) return;

    var btn = document.createElement('button');
    btn.className = 'dark-mode-toggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = '<span class="toggle-icon">&#9790;</span><span class="toggle-label">Dark Mode</span>';
    header.appendChild(btn);

    // Check stored preference
    var stored = localStorage.getItem('pylearn-dark-mode');
    if (stored === 'true') {
      document.body.classList.add('dark-mode');
      btn.innerHTML = '<span class="toggle-icon">&#9788;</span><span class="toggle-label">Light Mode</span>';
    }

    btn.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      var isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('pylearn-dark-mode', isDark);
      btn.innerHTML = isDark
        ? '<span class="toggle-icon">&#9788;</span><span class="toggle-label">Light Mode</span>'
        : '<span class="toggle-icon">&#9790;</span><span class="toggle-label">Dark Mode</span>';
    });
  }
  initDarkMode();

  /* ==============================================
     SEARCH
     ============================================== */
  var searchPages = [
    { title: 'Home', section: 'Home', url: 'index.html', keywords: 'home welcome start begin' },
    { title: 'What is Python?', section: 'A', url: 'what-is-python.html', keywords: 'python intro introduction overview popular strengths weaknesses comparison' },
    { title: 'Getting Started', section: 'B', url: 'getting-started.html', keywords: 'install setup pip venv virtual environment path terminal' },
    { title: 'Print, Variables & Numbers', section: 'C', url: 'basics-print-variables.html', keywords: 'print variable number int float math comment' },
    { title: 'Strings & Booleans', section: 'C', url: 'basics-strings-booleans.html', keywords: 'string text boolean true false type conversion fstring format' },
    { title: 'Lists, Tuples & Sets', section: 'C', url: 'basics-lists-tuples.html', keywords: 'list tuple set array append sort index slice' },
    { title: 'Dictionaries', section: 'C', url: 'basics-dictionaries.html', keywords: 'dictionary dict key value hash map' },
    { title: 'Conditionals', section: 'C', url: 'basics-conditionals.html', keywords: 'if elif else condition boolean logic' },
    { title: 'Loops', section: 'C', url: 'basics-loops.html', keywords: 'for while loop range break continue pass iterate' },
    { title: 'Functions & Lambda', section: 'C', url: 'basics-functions.html', keywords: 'function def return lambda scope args kwargs parameter' },
    { title: 'More Built-ins', section: 'C', url: 'basics-more.html', keywords: 'input error fstring slice comprehension enumerate zip sort map filter' },
    { title: 'Files & Modules', section: 'C', url: 'basics-files-modules.html', keywords: 'file read write open import module try except error' },
    { title: 'Common Patterns', section: 'D', url: 'common-patterns.html', keywords: 'pattern recipe csv json path regex date plot random subprocess' },
    { title: 'Top 100 Patterns', section: 'D', url: 'top-100-patterns.html', keywords: 'pattern reference snippet cheatsheet hundred' },
    { title: 'MATLAB to Python', section: 'E', url: 'matlab-to-python.html', keywords: 'matlab transition convert migrate index array vectorize plot' },
    { title: 'MATLAB Quick Translation', section: 'E', url: 'matlab-quick-translation.html', keywords: 'matlab table translate equivalent' },
    { title: 'Language Comparisons', section: 'F', url: 'comparisons.html', keywords: 'compare c cpp java javascript bash language versus' },
    { title: 'Mini Projects', section: 'G', url: 'projects.html', keywords: 'project calculator organizer csv plot parser renamer' },
    { title: 'Practice & Roadmap', section: 'H', url: 'practice.html', keywords: 'exercise quiz practice roadmap learning path debug' },
    { title: 'Best Practices', section: 'I', url: 'best-practices.html', keywords: 'style guide naming pep8 debug traceback antipattern' },
    { title: 'Common Errors', section: 'I', url: 'common-errors.html', keywords: 'error fix debug traceback syntaxerror typeerror nameerror' },
    { title: 'Cheat Sheet', section: 'J', url: 'cheatsheet.html', keywords: 'cheat sheet reference quick syntax summary' },
    { title: 'Python for Automation', section: 'Bonus', url: 'python-for-automation.html', keywords: 'automation script file shell command cli batch' },
    { title: 'Object-Oriented Programming', section: 'K', url: 'oop.html', keywords: 'class object oop inheritance method init self' },
    { title: 'NumPy & Pandas Basics', section: 'K', url: 'numpy-pandas.html', keywords: 'numpy pandas array dataframe matrix data science' },
    { title: 'Interactive Quizzes', section: 'H', url: 'interactive-quizzes.html', keywords: 'quiz test score interactive practice' },
    { title: 'Glossary', section: 'J', url: 'glossary.html', keywords: 'glossary term definition vocabulary' }
  ];

  function initSearch() {
    var searchBox = document.querySelector('.sidebar-search');
    if (!searchBox) return;
    var input = searchBox.querySelector('input');
    var resultsDiv = searchBox.querySelector('.search-results');
    if (!input || !resultsDiv) return;

    // Determine base path for links
    var isInPages = window.location.pathname.indexOf('/pages/') !== -1;
    var prefix = isInPages ? '' : 'pages/';
    var homePrefix = isInPages ? '../' : '';

    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        resultsDiv.classList.remove('active');
        resultsDiv.innerHTML = '';
        return;
      }
      var results = searchPages.filter(function (p) {
        return p.title.toLowerCase().indexOf(q) !== -1 ||
               p.keywords.indexOf(q) !== -1;
      });
      if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">No results found</div>';
      } else {
        resultsDiv.innerHTML = results.map(function (p) {
          var href = p.url === 'index.html' ? (homePrefix + 'index.html') : (prefix + p.url);
          return '<a href="' + href + '"><span class="search-section">[' + p.section + ']</span> ' + p.title + '</a>';
        }).join('');
      }
      resultsDiv.classList.add('active');
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!searchBox.contains(e.target)) {
        resultsDiv.classList.remove('active');
      }
    });

    // Keyboard navigation
    input.addEventListener('keydown', function (e) {
      var items = resultsDiv.querySelectorAll('a');
      var focused = resultsDiv.querySelector('.focused');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!focused && items.length) { items[0].classList.add('focused'); }
        else if (focused && focused.nextElementSibling) {
          focused.classList.remove('focused');
          focused.nextElementSibling.classList.add('focused');
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (focused && focused.previousElementSibling) {
          focused.classList.remove('focused');
          focused.previousElementSibling.classList.add('focused');
        }
      } else if (e.key === 'Enter') {
        if (focused) { window.location.href = focused.getAttribute('href'); }
      }
    });
  }
  initSearch();

  /* ==============================================
     BACK TO TOP BUTTON
     ============================================== */
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '&#9650;';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  initBackToTop();

  /* ==============================================
     COLLAPSIBLE SIDEBAR SECTIONS
     ============================================== */
  function initCollapsibleSidebar() {
    document.querySelectorAll('.sidebar .nav-section').forEach(function (section) {
      var title = section.querySelector('.nav-section-title');
      var links = section.querySelectorAll('.nav-link');
      if (!title || links.length === 0) return;

      // Wrap links in a group div if not already wrapped
      var group = section.querySelector('.nav-links-group');
      if (!group) {
        group = document.createElement('div');
        group.className = 'nav-links-group';
        links.forEach(function (link) { group.appendChild(link); });
        section.appendChild(group);
        // Set initial max-height for animation
        group.style.maxHeight = group.scrollHeight + 'px';
      }

      // Check if any link inside is active — don't collapse active section
      var hasActive = section.querySelector('.nav-link.active');

      // Restore collapsed state from storage
      var sectionId = title.textContent.trim();
      var collapsed = localStorage.getItem('pylearn-collapse-' + sectionId);
      if (collapsed === 'true' && !hasActive) {
        section.classList.add('collapsed');
        group.style.maxHeight = '0';
      }

      title.addEventListener('click', function () {
        var isCollapsed = section.classList.contains('collapsed');
        if (isCollapsed) {
          section.classList.remove('collapsed');
          group.style.maxHeight = group.scrollHeight + 'px';
          localStorage.setItem('pylearn-collapse-' + sectionId, 'false');
        } else {
          section.classList.add('collapsed');
          group.style.maxHeight = '0';
          localStorage.setItem('pylearn-collapse-' + sectionId, 'true');
        }
      });
    });
  }
  initCollapsibleSidebar();

  /* ==============================================
     PROGRESS TRACKER (visited pages)
     ============================================== */
  function initProgressTracker() {
    // Mark current page as visited
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var visited = JSON.parse(localStorage.getItem('pylearn-visited') || '{}');
    visited[page] = true;
    localStorage.setItem('pylearn-visited', JSON.stringify(visited));

    // Add checkmarks to visited links
    document.querySelectorAll('.sidebar .nav-link').forEach(function (link) {
      var href = link.getAttribute('href').split('/').pop();
      if (visited[href]) {
        link.classList.add('visited');
        if (!link.querySelector('.visited-check')) {
          var check = document.createElement('span');
          check.className = 'visited-check';
          check.textContent = '\u2713';
          link.appendChild(check);
        }
      }
    });

    // Progress summary
    var totalPages = document.querySelectorAll('.sidebar .nav-link').length;
    var visitedCount = 0;
    document.querySelectorAll('.sidebar .nav-link').forEach(function (link) {
      if (link.classList.contains('visited')) visitedCount++;
    });

    var progressEl = document.querySelector('.sidebar-progress');
    if (progressEl) {
      var pct = totalPages > 0 ? Math.round((visitedCount / totalPages) * 100) : 0;
      progressEl.innerHTML = 'Progress: ' + visitedCount + '/' + totalPages + ' pages (' + pct + '%)' +
        '<div class="progress-track"><div class="progress-track-fill" style="width:' + pct + '%"></div></div>';
    }
  }
  initProgressTracker();

  /* ==============================================
     SYNTAX HIGHLIGHTING
     ============================================== */
  function highlightPython() {
    var keywords = ['False','None','True','and','as','assert','async','await','break',
      'class','continue','def','del','elif','else','except','finally','for','from',
      'global','if','import','in','is','lambda','nonlocal','not','or','pass','raise',
      'return','try','while','with','yield'];
    var builtins = ['print','len','range','int','float','str','list','dict','tuple',
      'set','type','isinstance','input','open','sorted','reversed','enumerate','zip',
      'map','filter','any','all','sum','min','max','abs','round','bool','super',
      'property','staticmethod','classmethod','hasattr','getattr','setattr','format',
      'chr','ord','hex','bin','oct','id','help','dir','vars','globals','locals',
      'next','iter','callable','repr','hash','pow','divmod','complex','bytes',
      'bytearray','memoryview','frozenset','object','slice','eval','exec',
      'compile','breakpoint','__import__'];

    var kwRegex = new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g');
    var biRegex = new RegExp('\\b(' + builtins.join('|') + ')(?=\\s*\\()', 'g');

    document.querySelectorAll('pre code').forEach(function (block) {
      // Skip if already highlighted
      if (block.dataset.highlighted) return;
      block.dataset.highlighted = 'true';

      var html = block.innerHTML;

      // Don't highlight if it already has span tags (manually highlighted)
      if (/<span\s+class="(kw|fn|str|num|cmt|op|cls|bi)"/.test(html)) return;

      // Protect existing HTML entities
      // Step 1: Mark strings (handle them first to avoid highlighting inside strings)
      var tokens = [];
      var i = 0;

      // Simple tokenizer: replace strings and comments with placeholders
      html = html.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, function (m) {
        tokens.push('<span class="str">' + m + '</span>');
        return '%%TOK' + (tokens.length - 1) + '%%';
      });

      // Comments
      html = html.replace(/(#.*?)$/gm, function (m) {
        tokens.push('<span class="cmt">' + m + '</span>');
        return '%%TOK' + (tokens.length - 1) + '%%';
      });

      // Numbers (integers and floats, not inside words)
      html = html.replace(/\b(\d+\.?\d*(?:e[+-]?\d+)?)\b/gi, '<span class="num">$1</span>');

      // Keywords
      html = html.replace(kwRegex, '<span class="kw">$1</span>');

      // Built-in functions
      html = html.replace(biRegex, '<span class="bi">$1</span>');

      // Decorators
      html = html.replace(/(@\w+)/g, '<span class="fn">$1</span>');

      // Restore tokens
      html = html.replace(/%%TOK(\d+)%%/g, function (m, idx) {
        return tokens[parseInt(idx)];
      });

      block.innerHTML = html;
    });
  }
  highlightPython();

  /* ==============================================
     INTERACTIVE QUIZ ENGINE
     ============================================== */
  function initQuizzes() {
    document.querySelectorAll('.quiz-container').forEach(function (container) {
      var questions = container.querySelectorAll('.quiz-question');
      var totalQ = questions.length;
      var answered = 0;
      var correct = 0;

      questions.forEach(function (q) {
        var correctAnswer = q.dataset.answer;
        var options = q.querySelectorAll('.quiz-option');
        var feedback = q.querySelector('.quiz-feedback');
        var locked = false;

        options.forEach(function (opt) {
          opt.addEventListener('click', function () {
            if (locked) return;
            locked = true;
            answered++;

            var value = opt.dataset.value;
            if (value === correctAnswer) {
              opt.classList.add('correct');
              correct++;
              if (feedback) {
                feedback.textContent = feedback.dataset.correct || 'Correct!';
                feedback.className = 'quiz-feedback show correct';
              }
            } else {
              opt.classList.add('incorrect');
              // Highlight the correct one
              options.forEach(function (o) {
                if (o.dataset.value === correctAnswer) o.classList.add('correct');
              });
              if (feedback) {
                feedback.textContent = feedback.dataset.incorrect || 'Not quite. See the correct answer highlighted above.';
                feedback.className = 'quiz-feedback show incorrect';
              }
            }

            // If all answered, show score
            if (answered === totalQ) {
              var scoreEl = container.querySelector('.quiz-score');
              if (scoreEl) {
                var pct = Math.round((correct / totalQ) * 100);
                scoreEl.innerHTML = '<div class="score-number">' + correct + '/' + totalQ + '</div>' +
                  '<div class="score-label">' + pct + '% correct</div>';
                scoreEl.style.display = 'block';
              }
            }
          });
        });
      });

      // Reset button
      var resetBtn = container.querySelector('.quiz-reset');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          answered = 0;
          correct = 0;
          questions.forEach(function (q) {
            q.querySelectorAll('.quiz-option').forEach(function (o) {
              o.classList.remove('correct', 'incorrect', 'selected');
            });
            var fb = q.querySelector('.quiz-feedback');
            if (fb) fb.className = 'quiz-feedback';
          });
          var scoreEl = container.querySelector('.quiz-score');
          if (scoreEl) scoreEl.style.display = 'none';
        });
      }
    });
  }
  initQuizzes();

});
