<?php
include '../shared/not-home-header.html';
include '../../assets/php/php-lib.php';

if ($_GET['id']) {
  $id = $_GET['id'];

  $total_news = total_count('media'); 
  $sql = "SELECT * FROM media WHERE id='$id'";
  $row = Fetch(Query($sql));
  
  $filtered = array(
    'title' => $row['title'],
    'source' => $row['source'],
    'date' => $row['date'],
    'img_id' => $row['img_id'],
    'content' => $row['content']
  );
}


?>

<section class="banner inner_banner solution_idcard_ocr">
  <div class="banner_image">
    <img src="<?=__IMG_DIR__?>/sub_bn_06.png" alt="" />
    <img src="<?=__IMG_DIR__?>/test-mobile.png" alt="" />
  </div>
  <div class="container py-lg-2">
    <div class="row">
      <div class="col-lg-7 col-xl-5 text-center text-lg-left pt-0 pb-5 pt-md-5">
        <div class="banner_content wow fadeInDown">
          <h1>NEWS&MEDIA</h1>
        </div>
        <div class="w-100"></div>
      </div>
    </div>
  </div>
</section>
<section class="gray-bg">
    <div class="news__wrapper">
        <div class="news__header">
          
            <span id="news-part"><a href="/app/company/newsnmedia.php">NEWS&MEDIA</a> |</span>
            <span id="news-part">유스비 뉴스</span>
            <!-- 사용자 input1 - 기사 제목 -->
            <h4>
               <?= $filtered['title'] ?> 
            </h4>
            <!-- 사용자 input2 - 기사 출처 -->
            <span id="news-name">
               <?= $filtered['source'] ?> 
            </span>
            <!-- 사용자 input3 - 기사 날짜 -->
            <span id="news-date">
               <?= $filtered['date'] ?> 
            </span>
        </div>
        <!-- 사용자 input4 - 기사 첨부 이미지 -->
        <div class="news__img">
          <canvas class="news-canvas"></canvas>
        </div>
        <!-- 사용자 input5 - 기사 내용 -->
        <div class="news__content">

        </div>

        <!-- 저장된 기사 PK id 다음 3개 기사 -->
        <div class="news__suggestion">
          <h4>추천소식</h4>  
          <div class="news-display">
          <?php

            $sql = "SELECT * FROM media WHERE id < '$id' ORDER BY id LIMIT 3";
            $result = Query($sql);
            $count = mysqli_num_rows($result);
            if ($count <= 2) {
              $sql = "SELECT * FROM media WHERE id > '$id' ORDER BY id LIMIT 3";
              $result = Query($sql);
            }

            while($row = Fetch($result)) {
              $suggest = array(
                'title' => $row['title'],
                'source' => $row['source'],
                'date' => $row['date'],
                'img_id' => $row['img_id'],
              );
              $news_id = $row['id'];
          ?>
              <div class="suggested-news">
                  <div class="news-img" onClick="location.href='https://new.useb.co.kr/app/company/newspage.php?id=<?= $news_id ?>'">
                    <canvas class="news-canvas" style="background-image: url('https://webadmin.useb.co.kr/assets/uploaded/news/<?= $suggest['img_id'] ?>')"></canvas>
                  </div>
                  <div class="not_mobile">
                      <span id="news-name"><?= $suggest['source'] ?></span>
                      <span id="news-date"><?= $suggest['date'] ?></span>
                      <p id="news-title">
                        <a href="https://new.useb.co.kr/app/company/newspage.php?id=<?= $news_id ?>">
                          <?= $suggest['title'] ?>
                        </a>
                      </p>
                  </div>
                  <div class="on_mobile">
                    <h4><?= $suggest['title'] ?></h4>
                    <a href=""><?= $suggest['source'] ?></a>
                    <span><?= $suggest['date'] ?></span>
                  </div>
              </div>
          <?php
          }
          ?>
          </div>
        </div>
    </div>
</section>
<script>
  let newsImage = document.querySelector('.news-canvas');
  newsImage.style.backgroundImage =  `url('https://webadmin.useb.co.kr/assets/uploaded/news/<?= $filtered['img_id'] ?>')`;
  let newsContent = document.querySelector('.news__content');
  newsContent.innerHTML = `<?= $filtered['content'] ?>`;
</script>
</body>
<?php
  include '../shared/footer.html';
?>