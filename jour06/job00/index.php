<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jour 6 - BOOTSTRAP</title>

     <!-- lien vers le CSS Bootstrap (local) -->
    <link href="./assets/bootstrap-5.3.8/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>
<body>
    <main class="container-fluid">
        <h1>Bonjour Bootstrap !</h1>
        <p>Petite intro à Bootstrap</p>
        <button class="btn btn-primary">Mon bouton</button>

    <section class="row gap-1 m-2">

        <!-- <article class="col-5" style="background-color: lightblue;">
           <button class="btn btn-primary"><a href ="http://runtrack3.test/jour06/
           "></a></button>

        </article>

        <article class="col-5" style="background-color: lightcoral;">
            Job 00
        </article> -->
        
        <article class="row">
            <div class="col-12 col-md-6 col-lg-4 bg-dark border border-1 border-danger">
                <a href="../job01/">Job01</a>
            </div>
            <div class="col-12 col-md-6 col-lg-4 bg-dark border border-1 border-danger ">
                <a href="../job02/">Job02</a>
            </div>
            <div class="col-12 col-md-6 col-lg-4 bg-dark border border-1 border-danger">
                <a href="../job03/">Job03</a>
            </div>
        </article>

    </section>

    </main>


<!-- Link scrip bootstrap -->
<script src="./assets/bootstrap-5.3.8/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>